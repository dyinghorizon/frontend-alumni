class Organization {
    constructor(data) {
        this.id = data.id || null;
        this.organizationId = data.organizationId || null;
        this.organizationName = data.organizationName || '';
        this.organizationAddress = data.organizationAddress || '';
        this.position = data.position || '';
        this.joiningDate = data.joiningDate ? new Date(data.joiningDate) : null;
        this.leavingDate = data.leavingDate ? new Date(data.leavingDate) : null;
    }

    static fromResponse(data) {
        return new Organization({
            id: data.id,
            organizationId: data.organizationId,
            organizationName: data.organizationName,
            organizationAddress: data.organizationAddress,
            position: data.position,
            joiningDate: data.joiningDate,
            leavingDate: data.leavingDate
        });
    }

    toRequest() {
        return {
            organizationId: this.organizationId,
            position: this.position,
            joiningDate: this.formatDate(this.joiningDate),
            leavingDate: this.formatDate(this.leavingDate)
        };
    }

    formatDate(date) {
        if (!date) return null;
        return date.toISOString().split('T')[0];
    }

    isCurrentlyWorking() {
        return !this.leavingDate;
    }

    getDuration() {
        const start = this.joiningDate ? new Date(this.joiningDate) : null;
        const end = this.leavingDate ? new Date(this.leavingDate) : new Date();
        
        if (!start) return '';
        
        const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
            (end.getMonth() - start.getMonth());
        
        const years = Math.floor(diffInMonths / 12);
        const months = diffInMonths % 12;
        
        let duration = '';
        if (years > 0) duration += `${years} year${years > 1 ? 's' : ''} `;
        if (months > 0) duration += `${months} month${months > 1 ? 's' : ''}`;
        
        return duration.trim();
    }
}

export default Organization;