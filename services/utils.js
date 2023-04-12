const generator = require('generate-password');

exports.generate_password = () =>{
    
        let password = generator.generate({
    
            length: 10,
    
            numbers: true,
    
            strict:true
    
        });
    
        return password;
    
}
