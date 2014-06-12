## My First Android App

Reference:

[http://developer.android.com/training/basics/firstapp/index.html](<http://developer.android.com/training/basics/firstapp/index.html>)

### Which Environment

Which environment? Three possibilities:

1. ADT bundle (Eclipse + ADT plugin),
2. Android Studio (IntelliJ IDEA + plugin - early access preview at June 2014),
3. other IDEs + Android SDK (e.g. Netbeans + NBAndroid).

Was chosen the first: *ADT bundle*, on a laptop with a Debian GNU/Linux as o.s. (here simply called *Linux box* ).

### Which Target

I have:

- Samsung Galaxy Tab2 7.0, o.s. Android 4.2.2,
- Wiko Izzy, o.s. Android 4.2.2

so I installed the SDK platform and build target for *Android 4.2.2  (rev. 17)* (selecting *Window -> Android SDK Manager* in Eclipse with ADT or typing `/opt/adt-bundle/sdk/tools/android sdk` in the system shell). See it in the shell:

```
/opt/adt-bundle/sdk/tools/android list targets
```

The [SDK manager guide](<http://developer.android.com/tools/help/sdk-manager.html>) recommends to install the latest and the first (at the moment, the latest is 4.4.2 (rev. 19); as the first, it indicates 2.2). Question: what about in beetween targets? Let's see later.

### Creating the App

Created *MyFirstAppEclipse* using Eclipse menu.

Created *MyFirstAppSdk* using the shell:

```
/opt/adt-bundle/sdk/tools/android create project --target android-17 --name MyFirstAppSdk --path /path/to/workspace/MyFirstAppSdk --activity MainActivity --package com.marcellomessori.myfirstappsdk
```

The second is lighter:

```
user@linuxbox:/path/to/workspace$ du -hs MyFirstApp*
912K    MyFirstAppEclipse
132K    MyFirstAppSdk
```

### Version control for Android Apps using Git

```
user@linuxbox:/path/to/workspace$ wget -O - http://www.gitignore.io/api/android > .gitignore
```

### Deploying the app

Some troubles here. In a nutshell, we need to:

1. Set the device in *development mode* and connect it to the Linux box via USB (handshake).
2. Compile via shell using `ant` (or *run* in Eclipse with ADT).
3. Deploy via shell using `adb` (or *run* in Eclipse with ADT).

After setting the *development mode*, the *Developer options -> USB debugging* and *Security -> Unknown sources* where also set.

1. Trouble #1: the smartphone remains unknown to the Linux box (the tablet, intead, asked me a confirmation and the association was done).
2. Trouble #2: the deploy worked from the shell, but not fro Eclipse.

Tentatives for Trouble #1:

- `adb kill-server && adb start-server` on the Linux box;
- turn *Developer options -> USB debugging* off/on on the device;

Solution for Trouble #2: installed the latest ADT Bundle;

- no need to download again the packages from Android SDK Manager: copying them by hand, it works (`adt-bundle/sdk/system-images` and `adt-bundle/sdk/build-tools`);
- new version uses [Support Library Setup](<https://developer.android.com/tools/support-library/setup.html#using-apis>): what about `.gitignore`?
