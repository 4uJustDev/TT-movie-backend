import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { ValidationExeption } from 'src/exeptions/validation.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
            return value;
        }

        const isConstructor =
            metadata.metatype.prototype && metadata.metatype.prototype.constructor;
        const targetClass = isConstructor ? metadata.metatype : Object;

        const obj = plainToClass(targetClass, value);
        const errors: ValidationError[] = await validate(obj);

        if (errors.length > 0) {
            const messages = this.buildErrorMessages(errors);
            throw new ValidationExeption(messages);
        }

        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private buildErrorMessages(errors: ValidationError[]): string[] {
        return errors.map((error) => {
            return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
        });
    }
}
