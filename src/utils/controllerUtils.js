const wrap = fn => {
	if (fn.length === 4) {
		return async (err, req, res, next) => {
			try {
				await fn(err, req, res, next)
			} catch (e) {
				next(e)
			}
		}
	}

	return async (req, res, next) => {
		try {
			await fn(req, res, next)
		} catch (err) {
			next(err)
		}
	}
}

export function wrapErrHandler(fns) {
	return Array.isArray(fns)
		? fns.map(wrap)
		: wrap(fns)
}
