## Instructions on how to setup a dev env on Mac to build Android app

### Android development environment
- Install [Node](https://nodejs.org/en/download/) and [Watchman](https://facebook.github.io/watchman/) using [Homebrew](https://brew.sh/). Run following command to install brew

  ```brew
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

- After installing brew run following commands to install Node and Watchman

  ```brew
  brew install node
  brew install watchman
  ```

- [Install Android Studio](https://developer.android.com/studio/index.html) 
  
    Make sure the following checkboxes are selected
  - Android SDK
  - Android SDK Platform
  - Performance 
  - Android Virtual Device
    
- Configure the ANDROID_HOME environment variable
  ```shell
  Add the following lines to your $HOME/.bash_profile or $HOME/.bashrc config file
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  export PATH=$PATH:$ANDROID_HOME/platform-tools

  Type source $HOME/.bash_profile to load the config into your current shell. Verify that ANDROID_HOME has been added to your path by running echo $PATH
  ```


### Build react-native
1. Clone mobile app code
    ```
    git clone git@gitlab.com:fantasy-mesa/trading-saga/app.git
    ```

2. Pull in dependent modules
    ```
    git submodule update --init
    ```

3. Start Metro server
    ```shell
    npm run metro-run
    ```
   You shall see the prompt in console window similar to the following.
   ```   
   To reload the app press "r"
   To open developer menu press "d"
   ```

### Build app
To build debug version apk
```shell
npm run android-build-debug
```

To build release version app
```shell
npm run android-build-release
```

### Run app on a device or emu
Connect device before running the following command
```shell
android-list-devices
```
You shall see similar spew
```
8_Foldable_API_29
Nexus_6_Edited_API_28
Pixel_2_API_28
Pixel_4_API_28
Pixel_API_18
```

To run app on a Pixel_4_API_28 emu
```shell
(emulator @Pixel_4_API_28 -accel on -no-snapshot-save & sleep 5) && npm run android-run"
```

Copyright (C) 2021 [ALTAREY LLC](http://tradingsaga.com)
