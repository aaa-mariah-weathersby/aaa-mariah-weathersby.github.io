## Overview

This project was built from the starer pack...

`https://github.com/DimiMikadze/create-react-library`

## Jenkins Build Server

http://ace-lahq-jenkins-alb-431720118.us-west-1.elb.amazonaws.com/job/ACE%20Design%20System/

## Private Nexus Repository (temporary)

http://ace-lahq-nexus-alb-769347001.us-west-1.elb.amazonaws.com/

## Usage

In your project, create .npmrc and add the following

```
registry=http://ace-lahq-nexus-alb-769347001.us-west-1.elb.amazonaws.com/repository/aaa-npm-private-hosted/
# an email is required to publish npm packages
email=hang.david@clublabs.com
always-auth=false
_auth=YWRtaW46YWRtaW4xMjM0
```

Run the following command

```
npm install ace-design-system --save
```

This will create the following entry in package.json

`"ace-design-system": "1.X.X"`

In your react js files, add the following

```
import { Button } from 'ace-design-system';

....

<Button />
```