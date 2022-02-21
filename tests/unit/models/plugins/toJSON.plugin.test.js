const mongoose = require('mongoose');
const { toJSON } = require('../../../../src/models/plugins');

describe('toJSON plugin', () => {
  let connection;

  beforeEach(() => {
    connection = mongoose.createConnection();
  });

  it('deve substituir _id por id', () => {
    const schema = mongoose.Schema();
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    expect(doc.toJSON()).not.toHaveProperty('_id');
    expect(doc.toJSON()).toHaveProperty('id', doc._id.toString());
  });

  it('deve remover __v', () => {
    const schema = mongoose.Schema();
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    expect(doc.toJSON()).not.toHaveProperty('__v');
  });

  it('deve remover createdAt e updatedAt', () => {
    const schema = mongoose.Schema({}, { timestamps: true });
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model();
    expect(doc.toJSON()).not.toHaveProperty('createdAt');
    expect(doc.toJSON()).not.toHaveProperty('updatedAt');
  });

  it('deve remover qualquer caminho definido como privado', () => {
    const schema = mongoose.Schema({
      public: { type: String },
      private: { type: String, private: true },
    });
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model({ public: 'some public value', private: 'some private value' });
    expect(doc.toJSON()).not.toHaveProperty('private');
    expect(doc.toJSON()).toHaveProperty('public');
  });

  it('deve remover quaisquer caminhos aninhados definidos como privados', () => {
    const schema = mongoose.Schema({
      public: { type: String },
      nested: {
        private: { type: String, private: true },
      },
    });
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model({
      public: 'some public value',
      nested: {
        private: 'some nested private value',
      },
    });
    expect(doc.toJSON()).not.toHaveProperty('nested.private');
    expect(doc.toJSON()).toHaveProperty('public');
  });

  it('também deve chamar o esquema para a função de transformação JSON', () => {
    const schema = mongoose.Schema(
      {
        public: { type: String },
        private: { type: String },
      },
      {
        toJSON: {
          transform: (doc, ret) => {
            // eslint-disable-next-line no-param-reassign
            delete ret.private;
          },
        },
      }
    );
    schema.plugin(toJSON);
    const Model = connection.model('Model', schema);
    const doc = new Model({ public: 'some public value', private: 'some private value' });
    expect(doc.toJSON()).not.toHaveProperty('private');
    expect(doc.toJSON()).toHaveProperty('public');
  });
});
