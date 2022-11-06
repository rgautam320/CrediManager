// eslint-disable-next-line no-undef
const CrediManager = artifacts.require("CrediManager");

module.exports = async function (deployer) {
    await deployer.deploy(
        CrediManager,
        "0x3AF35Bf828B3AE143831CdA581E0E5e7e3937686",
        "Rajan",
        "Gautam",
        "rgautam",
        "gautamrajan073@gmail.com",
        "Admin"
    );
};
