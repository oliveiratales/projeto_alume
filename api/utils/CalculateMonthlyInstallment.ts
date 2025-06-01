export function CalculateMonthlyInstallment(
  principalAmount: number,
  monthlyInterestRate: number,
  termMonths: number
): number {
  if (monthlyInterestRate === 0) {
    return principalAmount / termMonths;
  }
  return (
    principalAmount *
    (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -termMonths)))
  );
}
