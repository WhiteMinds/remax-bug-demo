import { getFileInfo, View, useQuery, navigateBack, nextTick } from 'remax/wechat'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

export default () => {
	const query = useQuery()
	const data = useMemo(() => JSON.parse(decodeURIComponent(query.data)), [])

	const [uploadList, setUploadList] = useState<Array<string>>([])

	useEffect(() => {
		// nextTick(() => {
			test(data[0])
				.then(list => {
					console.log('uploadList', list)
					setUploadList(list)
					console.log('length', list.length)
				})
				.catch(console.error)

			async function test(filePath: string) {
				await getFileInfo({ filePath })
				return [filePath]
			}
		// })
	}, [data])

	const [currentPageUrl, setCurrentPageUrl] = useState('')

	useEffect(() => {
		setCurrentPageUrl('test')
	}, [])

	const goBack = useCallback(() => {
		navigateBack()
	}, [])

	return (
		<View>
			<View>
				<View>
					{currentPageUrl ? (
						<View onClick={goBack}>
							==Back==
						</View>
					) : null}
				</View>
			</View>

			Count: {uploadList.length}
			{uploadList.map(filePath => (
				<View key={filePath}>{filePath}</View>
			))}
		</View>
	)
}
