module.exports = {
	module: 
	{
		loaders: 
		[
			{loader: 'style-loader!css-loader', test:/\.css$/},
			{loader: 'babel-loader', include: [__dirname + '/client'], test:/\.jsx?$/},
			{loader: 'url-loader', test:/\.png$/}
		],
		entry: __dirname + '/client/index.jsx',
		output: 
		{
			filename: 'bundle.js',
			path: __dirname + '/public'
		}, 
		resolve: 
		{
			extensions: ['.js', '.jsx', '.jsx.html'],
			modules: [__dirname + '/node_modules']
		}
	}
}