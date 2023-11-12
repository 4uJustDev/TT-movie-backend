import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
import { Role } from './role.enum';
import { ROLES_KEY } from './roleAuth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private roleService: RoleService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles) {
                return true; // No specific roles required, access granted
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException(
                    "You don't have permission to access this resource",
                    HttpStatus.FORBIDDEN,
                );
            }

            const user = this.jwtService.verify(token);
            req.user = user;

            const rolesFromDB = await this.getRolesFromDatabase();
            const requiredIds = await Promise.all(
                requiredRoles.map(async (name) => {
                    const role = await this.roleService.getRoleValue(name);
                    return role._id.toString();
                }),
            );

            const roleHasPermision = findCommonElement(req.user.roles, requiredIds);
            const roleExists = findCommonElement(req.user.roles, rolesFromDB);

            if (roleHasPermision && roleExists) {
                return true;
            }
        } catch (e) {
            throw new HttpException(
                "You don't have permission to access this resource(Token)",
                HttpStatus.FORBIDDEN,
            );
        }
    }

    private async getRolesFromDatabase(): Promise<string[]> {
        const roles = await this.roleService.getAll();
        const roleIds = await Promise.all(
            roles.map(async (id) => {
                const roleValue = await this.roleService.getRoleValue(id.value);
                return roleValue._id.toString();
            }),
        );
        return roleIds;
    }
}

function findCommonElement(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            return true;
        }
    }
    return false;
}
