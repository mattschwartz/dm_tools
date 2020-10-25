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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var backupDir = '../../foundry-bak';
var createDirIfNotExists = function (path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
};
var backupBubblesNightmareWorld = function () {
    var worldLocation = '/Users/mattschwartz/FoundryVTT/Data/worlds/bubbles-nightmare';
    var backupDirPath = backupDir + '/Data/worlds/bubbles-nightmare/data';
    createDirIfNotExists(backupDirPath);
    var srcWorldDataDir = worldLocation + '/data';
    var files = fs.readdirSync(srcWorldDataDir);
    files.forEach(function (file) {
        var src = path.join(srcWorldDataDir, file);
        var dst = path.join(backupDirPath, file);
        // console.log('Copying ' + src + ' to ' + dst);
        fs.copyFile(src, dst, function (err) { return err && console.error('Failed to copy ' + src + ' to ' + dst + ': ' + err); });
    });
};
// main
(function () {
    console.log('Persisting Ms Bubbles Nightmare');
    backupBubblesNightmareWorld();
    console.log('Done');
})();
