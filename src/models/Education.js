class Education {
    constructor(data) {
        this.id = data.id || null;
        this.degree = data.degree || '';
        this.collegeName = data.collegeName || '';
        this.address = data.address || '';
        this.joiningYear = data.joiningYear || null;
        this.passingYear = data.passingYear || null;
    }

    static fromResponse(data) {
        return new Education(data);
    }

    isValid() {
        return (
            this.degree &&
            this.collegeName &&
            this.address &&
            this.joiningYear &&
            this.passingYear &&
            this.passingYear >= this.joiningYear
        );
    }
}

export default Education;