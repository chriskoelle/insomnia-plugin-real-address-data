const {addresses} = require('./addresses.json')
const {faker} = require('@faker-js/faker')

// For help writing plugins, visit the documentation to get started:
//   https://docs.insomnia.rest/insomnia/introduction-to-plugins

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
        const curDate = new Date();
        const hours = Math.ceil(curDate.getHours() / 10) * 10;
        const minutes = curDate.getMinutes();
        const semiRandom = `${hours % 12 || hours}${minutes}`
        const { [field]: value  } = addresses[semiRandom];

        return value || " ";
      }
    }
}];
