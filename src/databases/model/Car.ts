import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Car extends Model {
    static table = 'cars'

    @field('name')
    name!: string;

    @field('brand')
    brand!: string;

    @field('abaout')
    abaout!: string;

    @field('fuel_type')
    fuel_type!: string;

    @field('period')
    period!: string;

    @field('thumbnail')
    thumbnail!: string;
}

export { Car }