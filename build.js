const fs = require('fs-extra');
const { execSync } = require('child_process');


function build() {
    fs.removeSync('./dist');
    execSync('ng build notify-lite', { stdio: [0, 1, 2] });
    fs.copyFileSync('./projects/notify-lite/src/style.less', './dist/notify-lite/style.less');
    console.log('build success');
}

build();
