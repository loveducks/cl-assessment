import {createSlice} from "@reduxjs/toolkit"

import {get} from "../helpers/api"
export const initialState = {
	searchResults: {
		loading: false,
		loaded: false,
		hasErrors: false,
		data: []
	},
	loading: false,
	loaded: false,
	hasErrors: false,
	search: "",
	data: [],
	filters: {
		sortParams: "relevant",
		colorParams: "any",
		orientationParams: "any"
	},
	page: 1,
	totalPages: 1,
	apiSwitch: false
}

const collectionSlice = createSlice({
	name: "collection",
	initialState: initialState,
	reducers: {
		onDataFetching: state => {
			state.loading = true

			return state
		},
		onDataFetched: (state, {payload}) => {
			state.hasErrors = false
			state.loading = false
			state.loaded = true
			state.data = payload

			return state
		},
		onReject: state => {
			state.hasErrors = true
			state.loading = false
			state.loaded = true
			state.data = []

			return state
		},
		onSearch: (state, {payload}) => {
			state.searchResults.loading = true
			state.searchResults.hasErrors = false
			state.searchResults.loaded = false
			state.searchResults.data = []
			state.search = payload.search
			state.filters = payload.filters
			state.page = payload.page
			//reset array on new search
			if (payload.page === 1) state.data = []
			if (payload.search) state.apiSwitch = true

			return state
		},
		onSearchFetched: (state, {payload}) => {
			state.searchResults.hasErrors = false
			state.searchResults.loading = false
			state.searchResults.loaded = true
			state.searchResults.data = payload.results
			state.data = [...state.data, ...payload.results]
			state.totalPages = payload.results.total_pages

			return state
		},
		onSearchReject: state => {
			state.searchResults.hasErrors = true
			state.searchResults.loading = false
			state.searchResults.loaded = true
			state.searchResults.data = []
			state.data = []

			return state
		},
		onClearFilters: state => {
			state.filters = initialState.filters
			state.page = 1

			return state
		},
		onUpdateFilters: (state, {payload}) => {
			state.filters = payload.filters

			return state
		}
	},
	extraReducers: {}
})

export const {
	onDataFetched,
	onReject,
	onDataFetching,
	onSearch,
	onSearchFetched,
	onSearchReject,
	onClearFilters,
	onUpdateFilters
} = collectionSlice.actions

export const collectionsSelector = state => state.collection
export const dataSelector = state => state.data

//initial api call for a default collection
export function fetchCollections(collectionId) {
	return async dispatch => {
		try {
			dispatch(onDataFetching())
			const response = await get(`collections/${collectionId}/photos?page=1&per_page=20`)

			if (response) {
				dispatch(onDataFetched(response))
			} else {
				dispatch(onReject())
			}
		} catch (error) {
			console.log("Error", error)
		}
	}
}

export function fetchSearchResults(search, page = 1, filters) {
	return async dispatch => {
		try {
			dispatch(onSearch({search, page, filters}))
			const {sortParams, colorParams, orientationParams} = filters

			let queryString = `&order_by=${sortParams}`
			if (colorParams !== "any") queryString += `&color=${colorParams}`
			if (orientationParams !== "any") queryString += `&orientation=${orientationParams}`

			const response = await get(`search/photos?page=${page}&per_page=30&query=${search}${queryString}`)

			if (response) {
				dispatch(onSearchFetched(response))
			} else {
				dispatch(onSearchReject())
			}
		} catch (error) {
			console.log("Error", error)
		}
	}
}

export function clearFilters() {
	return dispatch => dispatch(onClearFilters())
}

export function updateFilters(filters) {
	return dispatch => dispatch(onUpdateFilters({filters}))
}

export default collectionSlice
