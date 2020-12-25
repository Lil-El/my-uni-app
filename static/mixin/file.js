export default {
	methods: {
		/**
		 * @param {String} fileName
		 * @description 读取或创建文件，返回FileEntry
		 * @return {FileEntry} 
		 */
		async getFileEntry(fileName, dirEntry) {
			return new Promise((resolve) => {
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					let entry = dirEntry || fs.root;
					entry.getFile(fileName, {
						create: true
					}, function(fileEntry) {
						resolve(fileEntry);
					});
				});
			})
		},
		/**
		 * @param {String} dirName
		 * @description 读取或创建文件夹，返回DirectoryEntry
		 * @return {DirectoryEntry} 
		 */
		async getDirEntry(dirName) {
			return new Promise(async (resolve) => {
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					fs.root.getDirectory(dirName, {
						create: true
					}, function(dirEntry) {
						resolve(dirEntry);
					})
				})
			})
		},
		async getFile(fileName, dirEntry) {
			return new Promise(async (resolve) => {
				let fileEntry = await this.getFileEntry(fileName, dirEntry);
				fileEntry.file(function(file) {
					resolve(file);
				});
			})
		},
		async getFileContext(path, dirEntry) {
			let deffered;
			let fileReader = new plus.io.FileReader();
			fileReader.onloadend = function(evt) {
				deffered(evt.target);
			}
			let file = await this.getFile(path, dirEntry);
			fileReader.readAsText(file, 'utf-8');
			return new Promise((resolve) => {
				deffered = resolve;
			});
		},
		removeFile(dirEntry, fileName) {
			plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
				let entry = dirEntry || fs.root;
				let directoryReader = entry.createReader();
				directoryReader.readEntries(function(entries) {
					for (let i = entries.length - 1; i >= 0; i--) {
						if (fileName) {
							if (fileName === entries[i].name) {
								console.log("删除文件", entries[i].name);
								entries[i].remove();
							}
						} else {
							if (entries[i].name.endsWith('.json')) {
								console.log("删除文件", entries[i].name);
								entries[i].remove();
							}
						}
					}
				});
			});
		},
		async existFile(fileName, dirEntry){
			return new Promise((resolve)=>{
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					let entry = dirEntry || fs.root;
					let directoryReader = entry.createReader();
					directoryReader.readEntries(function(entries) {
						let isExist = entries.some(entry => entry.name === fileName);
						resolve(isExist);
					});
				});
			})
		},
		async iterateDierctory(dirEntry) {
			return new Promise((resolve) => {
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					let entry = dirEntry || fs.root;
					let directoryReader = entry.createReader();
					directoryReader.readEntries(function(entries) {
						entries.forEach((item, idx, arr)=>{
							if(idx===0) console.log("---------------"+entry.name+"目录-----------------");
							console.log(idx+1, item.name);
							if(idx===arr.length-1) console.log("---------------end-----------------");
						})
						resolve(entries);
					}, function(e) {
						console.log("Read entries failed: " + e.message);
					});
				});
			})
		}
	}
}
