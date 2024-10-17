// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

// ._____.___ .______  .________.___.__  .______  
// :         |:      \ |    ___/:   |  \ :      \ 
// |   \  /  ||   .   ||___    \|   :   ||   .   |
// |   |\/   ||   :   ||       /|   .   ||   :   |
// |___| |   ||___|   ||__:___/ |___|   ||___|   |
//       |___|    |___|   :         |___|    |___|


module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['nightwatch/examples'],

  api_testing: {
    start_session: false,
    webdriver: {
      start_process: false,
    }
  },

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['nightwatch/page-objects'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: ['nightwatch/custom-commands'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: ['nightwatch/custom-assertions'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html

  plugins: ['@nightwatch/apitesting'],

  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: '',

  webdriver: {},

  test_workers: {
    enabled: true
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://reqres.in/',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName: 'chrome'
      },

      webdriver: {
        start_process: true,
        server_path: ''
      },

      test_runner: {
        // set mocha as the runner
        // For more info on using Mocha with Nightwatch, visit:
        // https://nightwatchjs.org/guide/writing-tests/using-mocha.html
        type: 'mocha',

        // define mocha specific options
        options: {
          ui: 'bdd',
          reporter: 'list'
        }
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless=new'
          ]
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },

    ////////////////////////////////////////////////////////////////////////////////////////
    // Configuration for using remote Selenium service or a cloud-based testing provider.  |
    //                                                                                     |
    // Please set the hostname and port of your remote selenium-server or cloud-provider   |
    // (by setting the following properties in the configuration below):                   |
    // - `selenium.host`                                                                   |
    // - `selenium.port`                                                                   |
    //                                                                                     |
    // If you are using a cloud provider such as CrossBrowserTesting, LambdaTests, etc.,   |
    // please set the username and access_key by setting the below environment variables:  |
    // - REMOTE_USERNAME                                                                   |
    // - REMOTE_ACCESS_KEY                                                                 |
    // (.env files are supported)                                                          |
    ////////////////////////////////////////////////////////////////////////////////////////
    remote: {
      // Info on all the available options with "selenium":
      // https://nightwatchjs.org/guide/configuration/settings.html#selenium-server-settings
      selenium: {
        start_process: false,
        server_path: '',
        host: '<remote-hostname>',
        port: 4444
      },

      username: '${REMOTE_USERNAME}',
      access_key: '${REMOTE_ACCESS_KEY}',

      webdriver: {
        keep_alive: true,
        start_process: false
      }
    },

    'remote.chrome': {
      extends: 'remote',
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true
        }
      }
    },

  },


  //////////////////////////////////////////////////////////////////////////////////
  // Configuration for when using the browserstack.com cloud service               |
  //                                                                               |
  // Please set the username and access key by setting the environment variables:  |
  // - BS_USERNAME                                                       |
  // - BS_ACCESS_KEY                                                     |
  // .env files are supported                                                      |
  //////////////////////////////////////////////////////////////////////////////////
  browserstack: {
    selenium: {
      host: 'hub.browserstack.com',
      port: 443
    },
    // More info on configuring capabilities can be found on:
    // https://www.browserstack.com/automate/capabilities?tag=selenium-4
    desiredCapabilities: {
      'bstack:options': {
        userName: '${BS_USERNAME}',
        accessKey: '${BS_ACCESS_KEY}',
      }
    },

    disable_error_log: true,
    webdriver: {
      timeout_options: {
        timeout: 15000,
        retry_attempts: 3
      },
      keep_alive: true,
      start_process: false
    }
  },

  'browserstack.local': {
    extends: 'browserstack',
    desiredCapabilities: {
      'browserstack.local': true
    }
  },

  'browserstack.chrome': {
    extends: 'browserstack',
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        w3c: true
      }
    }
  },

  'browserstack.firefox': {
    extends: 'browserstack',
    desiredCapabilities: {
      browserName: 'firefox'
    }
  },

  'browserstack.ie': {
    extends: 'browserstack',
    desiredCapabilities: {
      browserName: 'internet explorer',
      browserVersion: '11.0'
    }
  },

  'browserstack.safari': {
    extends: 'browserstack',
    desiredCapabilities: {
      browserName: 'safari'
    }
  },

  'browserstack.local_chrome': {
    extends: 'browserstack.local',
    desiredCapabilities: {
      browserName: 'chrome'
    }
  },

  'browserstack.local_firefox': {
    extends: 'browserstack.local',
    desiredCapabilities: {
      browserName: 'firefox'
    }
  },


  //////////////////////////////////////////////////////////////////////////////////
  // Configuration for when using the Selenium service, either locally or remote,  |
  //  like Selenium Grid                                                           |
  //////////////////////////////////////////////////////////////////////////////////
  selenium_server: {
    // Selenium Server is running locally and is managed by Nightwatch
    // Install the NPM package @nightwatch/selenium-server or download the selenium server jar file from https://github.com/SeleniumHQ/selenium/releases/, e.g.: selenium-server-4.1.1.jar
    selenium: {
      start_process: true,
      port: 4444,
      server_path: '', // Leave empty if @nightwatch/selenium-server is installed
      command: 'standalone', // Selenium 4 only
      cli_args: {
        //'webdriver.gecko.driver': '',
        //'webdriver.chrome.driver': ''
      }
    },
    webdriver: {
      start_process: false,
      default_path_prefix: '/wd/hub'
    }
  },

  'selenium.chrome': {
    extends: 'selenium_server',
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        w3c: true
      }
    }
  },

  'selenium.firefox': {
    extends: 'selenium_server',
    desiredCapabilities: {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: [
          // '-headless',
          // '-verbose'
        ]
      }
    }
  }





};
