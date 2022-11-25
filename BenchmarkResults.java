import java.util.LinkedList;
import java.util.List;

/**
 * Contains all info and stats about one code execution.
 */
public class BenchmarkResults {
	
	private String algorithm_name;
	private Input input;
	
	private List<Long> warmupResults = new LinkedList();
	private List<Long> results = new LinkedList();
	
	
	/**
	 * @param algorithm the algorithm whose results belong to.
	 * @param input the input set that has been used.
	 */
	public BenchmarkResults(BenchmarkAlgo algorithm, Input input){
		setAlgorithm_name(algorithm);
		setInput(input);
	}
	
	private void setAlgorithm_name(BenchmarkAlgo algorithm_name) {
		this.algorithm_name=algorithm_name.getClass().getName();
	}
	public void setInput(Input input){
		this.input=input;
	}
	
	public void addWarmupResult(Long warmup) {
		warmupResults.add(warmup);
	}
	public void addResult(Long result) {
		results.add(result);
	}
	
	
	public String getAlgorithm_name(){
		return algorithm_name;
	}
	public List<Long> getResults(){
		return results;
	}
	public Input getInput(){
		return input;
	}
	
	public Long getAverageResult() {
		return results.stream().reduce((long)0, Long::sum)/results.size();
	}
	public int getWarmupRunsNumber(){
		return warmupResults.size();
	}
	public int getActualRunsNumber(){
		return results.size();
	}
	
	/**
	 * Useful for printing in the console.
	 * @return the String representation.
	 */
	@Override
	public String toString() {
		return "Algorithm: "+algorithm_name+"\n"+
				"Input type: " + input.name+"\n"+
				"\t\t\t>" + input.description+"\n"+
				"Warmup runs: "+getWarmupRunsNumber()+"\n"+
				"Actual runs: "+getActualRunsNumber()+"\n"+
				"AVG Time : "+getAverageResult() +"\n";
//				"Input :" + input.value.toString();
	}
	
}
