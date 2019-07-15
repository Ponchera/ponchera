module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
  plugins: [
    ['import', { libraryName: '@ant-design/react-native' }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/transform-runtime', {
      helpers: true,
      regenerator: false
    }]
  ]
};
