export const SelectUserType = (data) => {
    if (data.isEmployee) {
        if (data.employee.isAdmin) {
            return 1
        } else if (data.employee.isSecretary) {
            return 2
        } else if (data.employee.isDoctor) {
            return 3
        }
    }
    return 4
}