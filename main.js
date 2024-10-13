function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate the dates
    if (start > end) {
        throw new Error("Start date must be before end date.");
    }

    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];
    let totalTarget = 0;

    // Loop through each month in the date range
    for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
        const startMonth = year === start.getFullYear() ? start.getMonth() : 0;
        const endMonth = year === end.getFullYear() ? end.getMonth() : 11;

        for (let month = startMonth; month <= endMonth; month++) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            let workingDaysInMonth = 0;
            let workedDaysInRange = 0;

            // Count working days in the month excluding Fridays
            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = new Date(year, month, day);
                if (currentDate.getDay() !== 5) { // Exclude Fridays
                    workingDaysInMonth++;
                    // Check if the current date is within the specified range
                    if (currentDate >= start && currentDate <= end) {
                        workedDaysInRange++;
                    }
                }
            }

            // Store the results for the current month
            daysExcludingFridays.push(workingDaysInMonth);
            daysWorkedExcludingFridays.push(workedDaysInRange);

            // Calculate the monthly target if there are worked days
            if (workedDaysInRange > 0) {
                const dailyTarget = totalAnnualTarget / 365; // Daily target based on annual target
                const monthlyTarget = workedDaysInRange * dailyTarget;
                monthlyTargets.push(monthlyTarget);
                totalTarget += monthlyTarget;
            } else {
                monthlyTargets.push(0); 
            }
        }
    }

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget,
    };
}

// Example usage
const result = calculateTotalTarget('2024-05-01', '2024-7-31', 2000);
console.log(result);








