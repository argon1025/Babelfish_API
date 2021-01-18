module.exports.helloworld = () => {}

module.exports.helloworld.a="1";
module.exports.helloworld.get_a= () => {
    this.helloworld.a++;
    return this.helloworld.a;
}