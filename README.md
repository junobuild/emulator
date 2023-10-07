# Juno Emulator

A local emulator suite to build and test [Juno]'s satellites locally.

> ⚠️ Please note that this project is currently a temporary solution and does not reflect the final form of our objectives. We have several scenarios in mind to ensure a seamless local developer experience, which are included in our roadmap.
>
> Therefore, please keep in mind that this repository is solely a temporary workaround and may be subject to breaking changes.

## Installation

To run a satellite locally, you will need the following software:

- [NodeJS](https://nodejs.org/en) (LTS)
- [dfx](https://github.com/dfinity/sdk) (last version)
- [didc](https://github.com/dfinity/candid/releases) (last release)

## Getting started

```
git clone https://github.com/junobuild/emulator
cd emulator
```

## Emulation

To emulate a satellite locally, you need to follow these three steps:

1. Start
2. Deploy
3. Config

### 1. Start

To start the emulator on your local machine, open a dedicated terminal and navigate to the root directory. Then, use the following command to start the emulator:

```bash
./junolator start
```

To execute other commands concurrently, open a new terminal. To stop the emulator, use Ctrl+C or enter the command `./junolator stop`.

### 2. Deploy

You will need to deploy the satellite emulator at least once. This typically involves setting up the initial configuration and data for the emulator.

```bash
./junolator deploy
```

Once the deployment process has been completed successfully, the command line will provide you with the necessary IDs for local authentication and satellite access. Additionally, you will receive a code snippet that can be embedded into your application to configure [Juno] locally.

### 3. Configuration

To configure the collections that will be used by the satellite's datastore and storage, you will need to update the `junolator.json` file located on your local machine.

Config has to be defined with following values:

- `collection`: the name of the collection (a `string`)
- `read`: read permissions (`public` | `private` | `managed` | `controllers`)
- `write`: read permissions (`public` | `private` | `managed` | `controllers`)
- `max_size`: an option specific to the `storage` that limits the size of the asset that can be uploaded (a `number`)

```json
{
  "collections": {
    "db": [
      {
        "collection": "demo",
        "read": "managed",
        "write": "managed"
      }
    ],
    "storage": [
      {
        "collection": "images",
        "read": "managed",
        "write": "managed",
        "max_size": 5000
      }
    ]
  }
}
```

Once you have finished configuring the necessary settings, you can apply the changes by running the following command:

```bash
./junolator config
```

You can run the above command to change your configuration as many times as you need. However, please note that each time you run the command, the configuration will be overwritten, and you will not be able to delete any fields.

## Additional features

Few additional features are available.

### Set a controller

To configure an additional controller with "Read+Write" permission, update the `junolator.json` file on your local machine. Edit the `controllers` field, providing a list of principals. Then run the specified command.

```bash
./junolator ctrl
```

## License

MIT © [David Dal Busco](mailto:david.dalbusco@outlook.com)

[juno]: https://juno.build
