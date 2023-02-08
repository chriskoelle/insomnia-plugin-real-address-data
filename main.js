const {addresses} = require('./addresses.json')
// For help writing plugins, visit the documentation to get started:
//   https://docs.insomnia.rest/insomnia/introduction-to-plugins

const addressFields = [
{value: "address1", displayName: "Address 1"},
{value: "address2", displayName: "Address 2"},
{value: "city", displayName: "City"},
{value: "state", displayName: "State"},
{value: "postalCode", displayName: "Postal Code"},
]
module.exports.templateTags = [{
    name: 'randomAddress',
    displayName: 'Random Address',
    description: 'Generate a random address.',
    args: [
      {
        displayName: 'Field',
        type: 'enum',
        defaultValue: "",
        options: addressFields
      }
    ],
    async run (context, field) {
        const curDate = new Date();
        const hours = Math.ceil(curDate.getHours() / 10) * 10;
        const minutes = curDate.getMinutes();
        const semiRandom = `${hours % 12 || hours}${minutes}`
        const { coordinates, ...address } = addresses[semiRandom];

        return address[field];
      ;
    }
}];
