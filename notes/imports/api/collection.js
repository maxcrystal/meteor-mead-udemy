import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import yup from 'yup';


class Collection extends Mongo.Collection {
  constructor(name, fields?, options?) {
    super(name, options);
    this.baseSchema = fields ? yup.object(fields) : undefined;
    this.fields = this.baseSchema.fields;
  }

  validateSync(value, options={ stripUnknown: true }) {
    let { schema, ...rest } = options;
    schema = schema ? this.baseSchema.shape(schema) : this.baseSchema;
    try {
      const validatedValue = schema.validateSync(value, rest);
      return validatedValue;
    } catch (err) {
      throw new Meteor.Error('400', err.message, err.errors)
    }
  }

  isValidSync(value, options={ stripUnknown: true }) {
    let { schema, ...rest } = options;
    schema = schema ? this.baseSchema.shape(schema) : this.baseSchema;
    try {
      const valid = schema.isValidSync(value, rest);
      return valid;
    } catch (err) {
      throw new Meteor.Error('400', err.message, err.errors)
    }
  }

  async validate(value, options={ stripUnknown: true }) {
    let { schema, ...rest } = options;
    schema = schema ? this.baseSchema.shape(schema) : this.baseSchema;
    try {
      const validatedValue = await schema.validateSync(value, rest);
      return validatedValue;
    } catch (err) {
      throw new Meteor.Error('400', err.message, err.errors)
    }
  }

  async isValid(value, options={ stripUnknown: true }) {
    let { schema, ...rest } = options;
    schema = schema ? this.baseSchema.shape(schema) : this.baseSchema;
    try {
      const valid = await schema.isValidSync(value, rest);
      return valid;
    } catch (err) {
      throw new Meteor.Error('400', err.message, err.errors)
    }
  }
}

export default Collection;
