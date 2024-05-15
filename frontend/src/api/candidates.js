import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"

const candidateAPI = axios.create({
    baseURL: import.meta.env.VITE_API_CANDIDATE
})


export const createCandidate = async (data) => {
    const response = await candidateAPI.post('/', data, {
        headers: {
            "Content-Type": "application/json",          
        },
    })
    return response.data;
}

export const createCandidateQuery = () => useMutation({
    mutationFn: createCandidate
})

export const updateCandidate = async (data) => {
    const response = await candidateAPI.patch(`/${data.id}`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return response.data;
}

export const updateCandidateQuery = () => useMutation({
    mutationFn: updateCandidate
})

export const getCandidate = async () => {
    const response = await candidateAPI.get('/')
    return response.data;
}

export const getCandidateQuery = () => {
    const { isLoading, isError, data, isFetching } = useQuery({
        queryKey: ['candidate'],
        queryFn: getCandidate
    })

    return { isLoading, isError, data, isFetching }
}

export const deleteCandidate = async (id) => {
    const response = await candidateAPI.delete(`/${id}`)
    return response.data;
}

export const deleteCandidateQuery = () => useMutation({
    mutationFn: deleteCandidate
})

