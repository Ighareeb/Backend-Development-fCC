package.json NOTES:
There are only two required fields; name and version for your package.json file.
Version describes the current version of your project. It follows semantic versioning (SemVer) format: major.minor.patch
Major: Significant changes that might break compatibility.
Minor: New features that are backward-compatible.
Patch: Bug fixes that are backward-compatible.
The MAJOR version should increment when you make incompatible API changes. The MINOR version should increment when you add functionality in a backwards-compatible manner. The PATCH version should increment when you make backwards-compatible bug fixes. This means that PATCHes are bug fixes and MINORs add new features but neither of them break what worked before. Finally, MAJORs add changes that won’t work with earlier versions.
^ caret symbol indicates that npm should restrict upgrades to patch or minor level updates, without allowing major version updates
~ tilde symbol only receive updates at the patch level.

The license field is where you inform users of what they are allowed to do with your project.
Permissive licenses: Allow users to do virtually anything with the software, including incorporating it into closed-source commercial products, without requiring them to share their modifications with the original project. Popular permissive licenses include the MIT License, the Apache License, and the BSD License.
Copyleft licenses: Require that any derivative works created from the original software must also be released under the same license. Ensures that the source code remains open and that any improvements made to the software are shared with the community. The most well-known copyleft license is the GNU General Public License (GPL).
