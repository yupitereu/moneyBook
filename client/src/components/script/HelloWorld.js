/**
 * HellowWorld Component
 * @property {Function} changeMyData
 */
export default {
	name: 'HelloWorld',
	props: {
		msg: String
	},
	inject: ['changeMyData'],
	mounted() {
		console.log('HelloWorld mounted');
	}
}