import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Upload, Camera, Download, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export const DocumentScanner = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      analyzeDocument(file);
    }
  };

  const analyzeDocument = async (file: File) => {
    setLoading(true);
    // Simulate document analysis
    setTimeout(() => {
      setAnalysisResult({
        reportType: "Blood Test Report",
        date: "2024-01-15",
        overallStatus: "Normal",
        findings: [
          {
            parameter: "Hemoglobin",
            value: "14.2 g/dL",
            normalRange: "12.0-15.5 g/dL",
            status: "normal",
            interpretation: "Your hemoglobin level is within the normal range, indicating good oxygen-carrying capacity."
          },
          {
            parameter: "Total Cholesterol", 
            value: "220 mg/dL",
            normalRange: "< 200 mg/dL",
            status: "high",
            interpretation: "Your cholesterol is slightly elevated. Consider reducing saturated fats and increasing fiber intake."
          },
          {
            parameter: "Blood Sugar (Fasting)",
            value: "95 mg/dL", 
            normalRange: "70-100 mg/dL",
            status: "normal",
            interpretation: "Your fasting glucose is normal. Maintain balanced meals to keep it stable."
          },
          {
            parameter: "Vitamin D",
            value: "18 ng/mL",
            normalRange: "30-100 ng/mL", 
            status: "low",
            interpretation: "Your vitamin D is low. Increase sun exposure and consider vitamin D-rich foods."
          }
        ],
        recommendations: [
          "Include more leafy greens and nuts in your diet for better cholesterol management",
          "Add fatty fish twice a week for vitamin D and omega-3 fatty acids", 
          "Maintain current balanced diet for blood sugar control",
          "Consider 15-20 minutes of morning sunlight exposure daily"
        ]
      });
      setLoading(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'high':
      case 'low':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-success/10 text-success border-success/20';
      case 'high':
      case 'low':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Medical Report Scanner</h1>
        <p className="text-muted-foreground mt-2">
          Upload your medical reports and get easy-to-understand analysis with dietary recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="card-wellness">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Upload Report
            </CardTitle>
            <CardDescription>
              Upload your medical report for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <div className="space-y-4">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Upload from device</p>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Or</p>
              <Button variant="outline" className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            </div>

            {uploadedFile && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{uploadedFile.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            )}

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Your medical reports are processed locally and securely. We don't store any personal health information.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <Card className="card-wellness">
              <CardContent className="text-center py-12">
                <div className="animate-wellness-pulse bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Analyzing your medical report...</p>
                <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
              </CardContent>
            </Card>
          ) : analysisResult ? (
            <>
              {/* Report Overview */}
              <Card className="card-feature">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{analysisResult.reportType}</span>
                    <Badge className={getStatusColor(analysisResult.overallStatus.toLowerCase())}>
                      {analysisResult.overallStatus}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Report Date: {analysisResult.date}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Detailed Findings */}
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle>Test Results & Interpretation</CardTitle>
                  <CardDescription>
                    Detailed analysis of your test parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResult.findings.map((finding: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center gap-2">
                          {getStatusIcon(finding.status)}
                          {finding.parameter}
                        </h4>
                        <div className="text-right">
                          <div className="font-medium">{finding.value}</div>
                          <div className="text-xs text-muted-foreground">
                            Normal: {finding.normalRange}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {finding.interpretation}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle>Dietary Recommendations</CardTitle>
                  <CardDescription>
                    Personalized nutrition advice based on your results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((recommendation: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button className="btn-wellness-hover">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline">
                      Get Diet Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="card-wellness">
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Upload a medical report to get started with the analysis
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};