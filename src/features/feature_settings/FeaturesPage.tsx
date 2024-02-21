import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { FeatureSettings } from "../../models/settings/featureSettings/featureSettings";
import { getIcon } from "../../app/util/getIcon";

export default function FeaturePage() {
    const [featureSettings, setFeatureSettings] = useState<FeatureSettings[] | null>(null);
    const [loading, setLoading] = useState(true);

    const setFeatureAsEnabled = async (id: number, status: boolean) => {
        try {
            await agent.FeatureConfigs.changeStatus(id, { IsFeatureEnabled: status });
            const features = await agent.FeatureConfigs.list();
            setFeatureSettings(features);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const features = await agent.FeatureConfigs.list();
                setFeatureSettings(features);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingComponent message="Loading features..." />;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Description</TableCell>  
                        <TableCell align="right">Enabled</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {featureSettings?.map((feature) => (
                        <TableRow key={feature.id}>
                            <TableCell align="right">
                                {getIcon(feature.featureIcon)} {feature.featureName}
                            </TableCell>
                            <TableCell align="right">{feature.featureCategory}</TableCell>
                            <TableCell align="right">{feature.featureDescription}</TableCell>  
                            <TableCell align="right">
                                <Checkbox
                                    checked={feature.isFeatureEnabled}
                                    onChange={() => setFeatureAsEnabled(feature.id, !feature.isFeatureEnabled)}
                                    color="primary"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}