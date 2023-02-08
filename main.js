const {addresses} = require('./addresses.json')
const {faker} = require('@faker-js/faker')

const addressFields = [
  "address1",
  "address2",
  "city",
  "state",
  "postalCode",
];

const fakerFields = [
  "firstName",
  "lastName",
  "fullName",
]

const mapOptions = (options) =>
  options.map(value =>( {value, displayName: titleCase(value)}))

const titleCase = (str) =>
  str.replace(/(^\w|[A-Z0-9])/g, (match) => ` ${match.toUpperCase()}`).trim();

const randomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)


const generateFakerData = (type) => {
  switch (type) {
    case "firstName":
      return faker.name.firstName();
    case "lastName":
      return faker.name.lastName();
    case "fullName":
      return faker.name.fullName();
  }
}

module.exports.templateTags = [{
    name: 'address',
    displayName: 'Address',
    description: 'Generate a random address.',
    validate: () => true,
    args: [
      {
        displayName: 'Field',
        type: 'enum',
        defaultValue: "",
        options: mapOptions([...addressFields, ...fakerFields])
      }
    ],
    async run (context, field) {
      if (fakerFields.includes(field)) {
        return generateFakerData(field)
      } else {
        const storedAddress = await context.store.getItem('address');
        const address = storedAddress ? JSON.parse(storedAddress) : addresses[randomNumberBetween(0,999)]
        context.store.setItem('address', JSON.stringify(address))

        return address[field] || " "
      }
    }
}];

module.exports.responseHooks = [
  context => context.store.clear()
]
