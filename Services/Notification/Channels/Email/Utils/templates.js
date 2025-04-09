import { render } from '../../../utils.js';

// this should be extensible and not be here. Ideally, this should be Provider and channel agnostic

export class EmailTemplate {
    constructor(subject,template) {
        this.template = template;
        this.subject = subject;
    }
    
    renderMessage(variables) {
        return render(this.template, variables);
    }
    
    renderSubject(variables) {
        return render(this.subject, variables);
    }
}