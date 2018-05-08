module.exports = (orm, db) => {
    return db.define(
        'user',
        {
            name: String,
            email: String,
            password: String,
        }, {
            methods: {
                test() {
                    console.log(`Testing ${this.name} ${this.email}`);
                }
            },
            validations: {
                //email: orm.enforce.email()
            },
        }
    );
};
