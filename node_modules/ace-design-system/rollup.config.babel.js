// import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import image from 'rollup-plugin-img';


export default {
  input: './src/index.js',
  moduleName: 'AceDesignSystem',
  sourcemap: true,

  // output: {
  //   file: './build/rrpm.js',
  //   format: 'umd',
  //   name: 'ReactRectanglePopupMenu',
  //   sourcemap: true
  // },

  targets: [
    {
      dest: './build/library.js',
      format: 'umd'
    },
    {
      dest: 'build/library.module.js',
      format: 'es'
    }
  ],

  plugins: [
    image(),
    postcss({
      modules: true
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/@material-ui/core/styles/index.js': ['MuiThemeProvider', 'createMuiTheme'],
      }
    })
  ],

  external: ['react', 'react-dom'],

  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};