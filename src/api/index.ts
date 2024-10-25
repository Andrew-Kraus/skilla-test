class ApiService {
    private baseUrl: string;
    private token: string;

    constructor() {
        this.baseUrl = 'https://api.skilla.ru/mango';
        this.token = 'testtoken';
    }

    async getCallList(dateStart: string, dateEnd: string, limit = 1000000, sortBy = 'date', order = 'DESC') {
        const params = new URLSearchParams({
            date_start: dateStart,
            date_end: dateEnd,
            limit: limit.toString(),
            sort_by: sortBy,
            order,
        });

        const response = await fetch(`${this.baseUrl}/getList?${params}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        return await response.json();
    }

    async getCallRecord(recordId: string, partnershipId: string) {
        const response = await fetch(`${this.baseUrl}/getRecord?record=${recordId}&partnership_id=${partnershipId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'audio/mpeg',
                'Content-Transfer-Encoding': 'binary',
                'Content-Disposition': 'filename="record.mp3"',
            },
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        return await response.blob();
    }
}

export const apiService = new ApiService();