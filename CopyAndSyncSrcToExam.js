const copyDir = require("copy-dir");
const defaultOption = {
    utimes: true,
    mode: true,
    cover: true,
};

const copyDirSync = (srcFolders, rootSrc, rootDest, option = {}) => {
    srcFolders.forEach(folder => {
        copyDir.sync(`${rootSrc}/${folder}`, `${rootDest}/${folder}`, {
            ...defaultOption,
            ...option,
        });
    });
};

const snapCoreFolders = [""];
copyDirSync(
    snapCoreFolders,
    "./components",
    "./examples/nextjs-example/react-native-styled-paper/components",
    {
        filter: function(stat, filepath, filename) {
            // do not want copy .git directories
            if (stat === "directory" && filename === "node_modules") {
                return false;
            }

            if (stat === "directory" && filename === ".git") {
                return false;
            }

            if (filename === "yarn.lock") {
                return false;
            }

            return true; // remind to return a true value when file check passed.
        },
    }
);

copyDirSync(
    snapCoreFolders,
    "./components",
    "./examples/rn-example/react-native-styled-paper/components",
    {
        filter: function(stat, filepath, filename) {
            // do not want copy .git directories
            if (stat === "directory" && filename === "node_modules") {
                return false;
            }

            if (stat === "directory" && filename === ".git") {
                return false;
            }

            if (filename === "yarn.lock") {
                return false;
            }

            return true; // remind to return a true value when file check passed.
        },
    }
);

// const snapDomFolders = ['assets', 'components', 'utils'];
// copyDirSync(
//   snapDomFolders,
//   './assets',
//   './dist/assets'
// );
