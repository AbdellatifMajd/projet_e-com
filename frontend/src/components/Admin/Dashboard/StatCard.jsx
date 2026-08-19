import { Card, CardContent } from "@mui/material";

const StatCard = ({ title, value }) => {
    return (
        <Card>
            <CardContent>
                <p className="text-sm text-gray-500">
                    {title}
                </p>

                <p className="text-2xl font-semibold mt-2">
                    {value}
                </p>
            </CardContent>
        </Card>
    );
};

export default StatCard;