const { complete } = require('./utils')

module.exports = {
  prompts: {
    name: {
      type: 'string',
      message: 'Project name (internal usage for dev)',
      validate: val => val && val.length > 0
    },

    productName: {
      type: 'string',
      message: 'Project product name (must start with letter if building mobile apps)',
      default: 'Quasar App',
      validate: val => val && val.length > 0
    },

    description: {
      type: 'string',
      message: 'Project description',
      default: 'A Quasar Framework app',
    },

    author: {
      type: 'string',
      message: 'Author'
    },

    css: {
      type: 'list',
      message: 'Pick your favorite CSS preprocessor: (can be changed later)',
      default: 'sass',
      choices: [
        {
          name: 'Sass with indented syntax (recommended)',
          value: 'sass',
          short: 'Sass'
        },
        {
          name: 'Sass with SCSS syntax (recommended)',
          value: 'scss',
          short: 'SCSS'
        },
        {
          name: 'Stylus',
          value: 'stylus'
        },
        {
          name: 'None (the others will still be available)',
          value: 'none',
          short: 'None'
        }
      ]
    },

    importStrategy: {
      type: 'list',
      message: 'Pick a Quasar components & directives import strategy: (can be changed later)',
      choices: [
        {
          name: '* Auto-import in-use Quasar components & directives\n    - slightly higher compile time; next to minimum bundle size; most convenient',
          value: '\'auto\'',
          short: 'Auto import',
          checked: true
        },
        {
          name: '* Manually specify what to import\n    - fastest compile time; minimum bundle size; most tedious',
          value: 'false',
          short: 'Manual'
        },
        {
          name: '* Import everything from Quasar\n    - not treeshaking Quasar; biggest bundle size; convenient',
          value: 'true',
          short: 'Import everything'
        }
      ]
    },

    preset: {
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [
        {
          name: 'ESLint',
          value: 'lint',
          checked: true
        },
        {
          name: 'Vuex',
          value: 'vuex'
        },
        {
          name: 'TypeScript',
          value: 'typescript'
        },
        {
          name: 'Axios',
          value: 'axios'
        },
        {
          name: 'Vue-i18n',
          value: 'i18n'
        },
        {
          name: 'IE11 support',
          value: 'ie'
        }
      ]
    },

    typescriptConfig: {
      when: 'preset.typescript',
      type: 'list',
      message: 'Pick a component style:',
      choices: [
        {
          name:
            'Composition API (recommended) (https://github.com/vuejs/composition-api)',
          value: 'composition',
          short: 'Composition',
        },
        {
          name:
            'Class-based (recommended) (https://github.com/vuejs/vue-class-component & https://github.com/kaorun343/vue-property-decorator)',
          value: 'class',
          short: 'Class',
        },
        {
          name: 'Object API',
          value: 'object',
          short: 'object',
        }
      ]
    },

    lintConfig: {
      when: 'preset.lint',
      type: 'list',
      message: 'Pick an ESLint preset:',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        },
        {
          name: 'Prettier (https://github.com/prettier/prettier)',
          value: 'prettier',
          short: 'Prettier'
        }
      ]
    },

    cordovaId: {
      type: 'string',
      message: 'Cordova/Capacitor id (disregard if not building mobile apps)',
      default: 'org.cordova.quasar.app'
    },

    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use Yarn (recommended)',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'NPM',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        }
      ]
    }
  },

  filters: {
    // ESlint files
    '.eslintignore': 'preset.lint',
    '.eslintrc.js': 'preset.lint',
    
    // Default files when not using TypeScript
    'jsconfig.json': '!preset.typescript',
    'src/router/*.js': '!preset.typescript',
    
    // Presets files when not using TypeScript
    'src/boot/axios.js': 'preset.axios && !preset.typescript',
    'src/boot/i18n.js': 'preset.i18n && !preset.typescript',
    'src/i18n/**/*.js': 'preset.i18n && !preset.typescript',
    'src/store/**/*.js': 'preset.vuex && !preset.typescript',
    
    // TypeScript files
    '.prettierrc': `preset.lint && preset.typescript && lintConfig === 'prettier'`,
    'tsconfig.json': 'preset.typescript',
    'src/env.d.ts': 'preset.typescript',
    'src/shims-vue.d.ts': 'preset.typescript',
    'src/components/CompositionComponent.vue': `preset.typescript && typescriptConfig === 'composition'`,
    'src/components/ClassComponent.vue': `preset.typescript && typescriptConfig === 'class'`,
    'src/components/ObjectComponent.vue': `preset.typescript && typescriptConfig === 'object'`,
    'src/components/models.ts': `preset.typescript`,
    
    // Default files using TypeScript
    'src/router/*.ts': 'preset.typescript',
    
    // Presets files using TypeScript
    'src/boot/axios.ts': 'preset.axios && preset.typescript',
    'src/boot/composition-api.ts': `preset.typescript && typescriptConfig === 'composition'`,
    'src/boot/i18n.ts': 'preset.i18n && preset.typescript',
    'src/i18n/**/*.ts': 'preset.i18n && preset.typescript',
    'src/store/**/*.ts': 'preset.vuex && preset.typescript',
    
    // CSS preprocessors
    '.stylintrc': `preset.lint && css === 'stylus'`,
    'src/css/*.styl': `css === 'stylus'`,
    'src/css/*.scss': `css === 'scss'`,
    'src/css/*.sass': `css === 'sass'`,
    'src/css/app.css': `css === 'none'`,
  },

  complete
};
