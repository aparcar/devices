# OpenWrt Device Form [GSoC'21]

Device Form to generate YAML description of the device.

# Preview

![preview](/preview.gif)

## Prerequisites:

- [NodeJS](https://nodejs.org/en/download/)
- [Python](https://www.python.org/downloads/)

## Setting up locally

      - git clone https://github.com/aparcar/devices.git or
        git clone git@github.com:aparcar/devices.git
      - cd devices && yarn install pip3
      - install jsonschema pyyaml json-schema-for-humans
      - python3 validate merge-to-json
      - cd form/public/ generate-schema-doc schema.json

## Run react server

    cd form
    yarn start
