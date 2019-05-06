export const updateOvject = (oldObject, updatedProperties) => {
	return {...oldObject,
		...updatedProperties}
}