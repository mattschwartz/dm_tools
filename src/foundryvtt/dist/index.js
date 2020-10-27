"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var moment_1 = __importDefault(require("moment"));
var backupDir = '/Users/mattschwartz/GitHub/foundry-bak';
var createDirIfNotExists = function (path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
    return path;
};
var transformJs = function (backupDirPath, srcPath, fileNameAndExt) {
    console.log('Reading file:', srcPath);
    var content = fs.readFileSync(srcPath, { encoding: 'utf-8' });
    var lines = content.split('\n');
    var items = [];
    lines.filter(function (t) { return t; }).forEach(function (line) {
        items.push(JSON.parse(line));
    });
    var dstDir = createDirIfNotExists(path.join(backupDirPath, 'transforms'));
    var dst = path.join(dstDir, fileNameAndExt + '.json');
    console.log('Writing transform file:' + dst);
    var transformJsContent = JSON.stringify(items, null, 2);
    fs.writeFile(dst, transformJsContent, function (err) {
        if (err) {
            console.error('Write Error: ' + err);
        }
    });
};
var backupBubblesNightmareWorld = function () {
    var worldRootDirPath = '/Users/mattschwartz/FoundryVTT/Data/worlds/bubbles-nightmare';
    var backupDirPath = backupDir + '/Data/worlds/bubbles-nightmare/data';
    createDirIfNotExists(backupDirPath);
    var srcWorldDataDirPath = worldRootDirPath + '/data';
    var files = fs.readdirSync(srcWorldDataDirPath);
    files.forEach(function (file) {
        var src = path.join(srcWorldDataDirPath, file);
        var dst = path.join(backupDirPath, file);
        fs.copyFile(src, dst, function (err) { return err && console.error('Failed to copy ' + src + ' to ' + dst + ': ' + err); });
        transformJs(backupDirPath, src, file);
    });
};
// main
(function () {
    console.log('Persisting Ms Bubbles Nightmare');
    backupBubblesNightmareWorld();
    console.log('Done');
    console.log('Committing changes...');
    var commitMessage = 'Backup ' + moment_1.default.utc().format('yyyy/MM/DD HH:mm:ss z');
    child_process_1.exec("/Users/mattschwartz/GitHub/dm_tools/src/foundryvtt/commit.sh '" + commitMessage + "'", function (err, stdout, stderr) {
        if (err) {
            console.error('err:', err);
            return;
        }
        if (stderr) {
            console.error('Commit terminated with error:', stderr);
            return;
        }
        stdout && console.info('stdout:', stdout);
    });
})();
