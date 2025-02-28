import dayjs from 'dayjs'

export function useTrialDays(trialEndsAt: number) {
	const differenceFromNow = dayjs(trialEndsAt).diff(dayjs(), 'days', true)

	const trialRemainingDays = Math.ceil(differenceFromNow)

	let trialMessage: string

	if (trialRemainingDays > 1) {
		trialMessage = `Faltam apenas ${trialRemainingDays} dias para o fim do seu teste.`
	} else if (trialRemainingDays > 0) {
		trialMessage = 'Seu período de teste termina em poucas horas.'
	} else {
		trialMessage = 'Seu período de teste terminou e a página é visível apenas para você.'
	}

	return {
		trialMessage,
		trialRemainingDays,
		trialExpired: differenceFromNow <= 0,
	}
}
