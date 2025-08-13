// src/hooks/usePostulacionDetail.js
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/Api/AuthContext";
import { API_URL } from "@/Api/Api";
import { useTrabajos } from "@/components/Trabajos/store/useTrabajos";


export const usePostulacionDetail = (isOpen) => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [detail, setDetail] = useState(null);
    const [documents, setDocuments] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { servicios } = useTrabajos();
    
    useEffect(() => {
        if (!isOpen || !user?.email) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1) Todas las postulaciones
                const { data: allData } = await axios.get(API_URL.POSTULACIONES, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const all = allData.data ?? allData;

                // 2) Filtrar por email
                const found = all.filter((p) => p.email === user.email);
                console.log("Postulaciones encontradas:", found);
                if (!found.length) {
                    setDetail(null);
                } else {
                    const newData = found.map(postulacion => {
                        const servicio = servicios.find(servicio => servicio.id === postulacion.servicios_id);
                        return {
                            ...postulacion,
                            servicio: servicio ? {
                                ...servicio,
                                imagenes: servicio.imagenes.filter(img => !img.imagen_url.includes('bannerImg')) || [],
                                bannerImage: servicio.imagenes.find(img => img.imagen_url.includes('bannerImg')) || null,
                            } : null
                        };
                    })
                     const { data: detailData } = await axios.get(
                        `${API_URL.POSTULACIONES}/${found[0].id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    console.log("Detalle de la postulación:", detailData);
                    setDetail([...newData]);
                    setDocuments(detailData.data.usuario || []);
                    
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isOpen, user, token]);

    return { detail, loading, error, documents };
};
