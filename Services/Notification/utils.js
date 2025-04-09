
export function render(emailTemplate,variables) {
    // this is a simple variable replacement. Ideally, this should be a more complex templating engine
    return emailTemplate.replace(/{(.*?)}/g, (match, key) => {
        const variable = variables[key.trim()];
        return variable !== undefined ? variable : match;
    });
}

export function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}