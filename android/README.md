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

This is true for the SDK generated project, not for ADT Bundle's generated projects, that have `.metadata`, a reference to `appcompat_v7` and a 640KB library on `/libs`. Must find a suitable app template (Maven?).

### Deploying the app

Some troubles here. In a nutshell, we need to:

1. Set the device in *development mode* and connect it to the Linux box via USB (handshake).
2. Compile via shell using `ant` (or *run* in Eclipse with ADT).
3. Deploy via shell using `adb` (or *run* in Eclipse with ADT).

After setting the *development mode*, the *Developer options -> USB debugging* and *Security -> Unknown sources* where also set.

1. Trouble #1: the smartphone remains unknown to the Linux box (the tablet, intead, asked me a confirmation and the association was done).
2. Trouble #2: the deploy worked from the shell, but not from Eclipse.
3. Trouble #3: Eclipse gives me the `Path for project must have only one segment` error.
4. Trouble #4: Eclipse gives me a NullPointerException after creating a new project.

Tentatives for Trouble #1:

- `adb kill-server && adb start-server` on the Linux box;
- turn *Developer options -> USB debugging* off/on on the device;

Solution for Trouble #1: new rule for udev (needed by some devices, maybe by HTC's and not by Samsung's)

- get the vendor code using `lsusb` (for my smartphone was `0bb4`),
- `root@linuxbox:~# echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="0bb4", MODE="0666", GROUP="plugdev"' > /etc/udev/rules.d/99-adb.rules && service udev restart`

Solution for Trouble #2: installed the latest ADT Bundle;

- no need to download again the packages from Android SDK Manager: copying them by hand, it works (`adt-bundle/sdk/system-images` and `adt-bundle/sdk/build-tools`);
- new version uses [Support Library Setup](<https://developer.android.com/tools/support-library/setup.html#using-apis>): what about `.gitignore`?

Solution for Trouble #3: go to `Project -> Properties -> Run/Debug Settings:` and delete `Launching New_configuration`.

Solution for Trouble #4: deleted the project, restarted the IDE and recreated the project.

Now I can debug using Eclipse or Ant; Ant can only deploy a debug APK or a signed release APK (not an unsigned release: `INSTALL_PARSE_FAILED_NO_CERTIFICATES`).

### USB tethering and USB deployment on the same device

Good news: can do USB deployment while keeping USB tethering active from the same device.

### Alternative IDEs

- Netbeans with NBandroid plugin: not tested for now; the core plugin is free, while the extras (useful?) cost 15 EUR
- Netbeans with CodenameOne plugin: one plugin to generate native code for Android, IOS, etc., free for the first 100 builds (not my need); generation's been done server side after registration.

### Following the tutorial

[Building a Simple User Interface](<http://developer.android.com/training/basics/firstapp/building-ui.html>)

### TODO

Find a clean way to generate a new project:

- SDK, then import in Eclipse?
- Maven, then import in Eclipse?

Not just Eclipse, for sure, 'cause I like typing (not mouse clicks) and the resulting structure seems too complex (expecially from the SVC point of view).
