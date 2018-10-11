module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': [ 2, 'always' ],
        'indent': [ 'error', 4 ],
        'space-before-function-paren': [ 'error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'always'
        } ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
