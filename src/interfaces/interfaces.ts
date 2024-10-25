export interface ICall {
    id: string,
    date: string,
    date_notime: string,
    in_out: number,
    person_avatar: string,
    to_number: string,
    from_number: string,
    status: string,
    source: string,
    time: number,
    record: string | null,
    errors?: string[],
    partnership_id?: string,
    contact_name?: string,
    contact_company?: string,   
}

