import { render } from './utils.js';

// this should be extensible and not be here. Ideally, this should be Provider and channel agnostic

class EmailTemplate {
    constructor(template) {
        this.template = template;
    }
    
    render(variables) {
        return render(this.template, variables);
    }
}