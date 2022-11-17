import java.util.LinkedList;
import java.util.List;

public class BenchmarkResults {
	
	private String algorithm;
	private List<Long> warmupResults = new LinkedList<Long>();
	private List<Long> results = new LinkedList<Long>();
	
	//	TODO: Use linked lists for constant access time
	public BenchmarkResults(Class algorithm){
		setAlgorithm(algorithm);
	}
	public BenchmarkResults(Class algorithm, List<Long> warmupResults, List<Long> results){
		setAlgorithm(algorithm);
		this.warmupResults=warmupResults;
		this.results=results;
	}
	
	private void setAlgorithm(Class algorithm) {
		this.algorithm=algorithm.getName();
	}
	
	
	public void addWarmupResult(Long warmup) {
		warmupResults.add(warmup);
	}
	public void addResult(Long result) {
		results.add(result);
	}
	
	public Long getAverageResult() {
		return results.stream().reduce((long)0, Long::sum)/results.size();
	}
	public String getAlgorithm(){
		return algorithm;
	}
//	public List<Long> getWarmupResults(){
//		return warmupResults;
//	}
	public List<Long> getResults(){
		return results;
	}
}
