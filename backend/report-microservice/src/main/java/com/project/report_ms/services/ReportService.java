package com.project.report_ms.services;


import com.project.report_ms.entities.*;
import com.project.report_ms.models.Client;
import com.project.report_ms.models.Devolution;
import com.project.report_ms.models.Loan;
import com.project.report_ms.models.Tool;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ReportService {

    RestTemplate restTemplate = new RestTemplate();

    String toolUrl = "http://TOOL-MS/tools";
    String clientUrl = "http://CLIENT-MS/clients";
    String loanUrl = "http://LOAN-MS/loans";
    String devolutionUrl = "http://LOAN-MS/devolutions";


    public List<ValidityDto> getValidityOfLoans() {
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/", List.class);
        List<Devolution> devolutions = restTemplate.getForObject(devolutionUrl + "/", List.class);

        List<Loan> unpaidLoans = new ArrayList<>();

        assert loans != null;
        for (Loan loan : loans) {

            boolean isReturned = false;

            for (Devolution devolution : devolutions) {
                if (loan.getId() == devolution.getLoanId()){
                    isReturned = true;
                    break;
                }
            }

            if (!isReturned){
                unpaidLoans.add(loan);
            }
        }

        List<ValidityDto> validities = new ArrayList<>();

        for (Loan loan : unpaidLoans) {
            ValidityDto validityDto = new ValidityDto();
            validityDto.setLoan(loan);
            if (loan.getAgreedDate().isBefore(LocalDate.now())){
                validityDto.setState("atrasado");
            }
            else {
                validityDto.setState("vigente");
            }
            validities.add(validityDto);
        }

        return validities;
    }

    public List<ValidityDto> getValidityOfLoans(LocalDate date1, LocalDate date2) {
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/" + date1 + "/" + date2, List.class);
        List<Devolution> devolutions = restTemplate.getForObject(devolutionUrl + "/", List.class);

        List<Loan> unpaidLoans = new ArrayList<>();

        assert loans != null;
        for (Loan loan : loans) {

            boolean isReturned = false;

            for (Devolution devolution : devolutions) {
                if (loan.getId() == devolution.getLoanId()){
                    isReturned = true;
                    break;
                }
            }

            if (!isReturned){
                unpaidLoans.add(loan);
            }
        }

        List<ValidityDto> validities = new ArrayList<>();

        for (Loan loan : unpaidLoans) {
            ValidityDto validityDto = new ValidityDto();
            validityDto.setLoan(loan);
            if (loan.getAgreedDate().isBefore(LocalDate.now())){
                validityDto.setState("atrasado");
            }
            else {
                validityDto.setState("vigente");
            }
            validities.add(validityDto);
        }

        return validities;
    }

    public List<ValidityDto> getValidityOfLoansAfter(LocalDate date) {
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/After/" + date, List.class);
        List<Devolution> devolutions = restTemplate.getForObject(devolutionUrl + "/", List.class);

        List<Loan> unpaidLoans = new ArrayList<>();

        assert loans != null;
        for (Loan loan : loans) {

            boolean isReturned = false;

            for (Devolution devolution : devolutions) {
                if (loan.getId() == devolution.getLoanId()){
                    isReturned = true;
                    break;
                }
            }

            if (!isReturned){
                unpaidLoans.add(loan);
            }
        }

        List<ValidityDto> validities = new ArrayList<>();

        for (Loan loan : unpaidLoans) {
            ValidityDto validityDto = new ValidityDto();
            validityDto.setLoan(loan);
            if (loan.getAgreedDate().isBefore(LocalDate.now())){
                validityDto.setState("atrasado");
            }
            else {
                validityDto.setState("vigente");
            }
            validities.add(validityDto);
        }

        return validities;
    }

    public List<ValidityDto> getValidityOfLoansBefore(LocalDate date) {
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/Before/" + date, List.class);
        List<Devolution> devolutions = restTemplate.getForObject(devolutionUrl + "/", List.class);

        List<Loan> unpaidLoans = new ArrayList<>();

        assert loans != null;
        for (Loan loan : loans) {

            boolean isReturned = false;

            for (Devolution devolution : devolutions) {
                if (loan.getId() == devolution.getLoanId()){
                    isReturned = true;
                    break;
                }
            }

            if (!isReturned){
                unpaidLoans.add(loan);
            }
        }

        List<ValidityDto> validities = new ArrayList<>();

        for (Loan loan : unpaidLoans) {
            ValidityDto validityDto = new ValidityDto();
            validityDto.setLoan(loan);
            if (loan.getAgreedDate().isBefore(LocalDate.now())){
                validityDto.setState("atrasado");
            }
            else {
                validityDto.setState("vigente");
            }
            validities.add(validityDto);
        }

        return validities;
    }

    public List<Client> getClientsWithDelays(){
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/", List.class);
        List<Client> clients = restTemplate.getForObject(clientUrl + "/", List.class);
        List<Devolution> devolutions = restTemplate.getForObject(devolutionUrl + "/", List.class);

        List<Loan> loansWithDelays = new ArrayList<>();
        List<Client> clientsWithDelays = new ArrayList<>();

        for (Loan loan : loans) {

            boolean isReturned = false;

            for (Devolution devolution : devolutions) {
                if (loan.getId() == devolution.getLoanId()){
                    isReturned = true;
                    break;
                }
            }

            if (!isReturned){
                loansWithDelays.add(loan);
            }
        }

        for (Client client : clients) {
            for (Loan loan : loansWithDelays) {
                if (client.getId() == loan.getClientId()){
                    clientsWithDelays.add(client);
                }
            }
        }

        return clientsWithDelays;
    }

    public void QSSwap(List<PopularityDto> ranking, int i, int j){
        PopularityDto temp = ranking.get(i);
        ranking.set(i, ranking.get(j));
        ranking.set(j, temp);
    }

    public int QSPartition(List<PopularityDto> ranking, int low, int high){

        long pivot = ranking.get(high).getLoanQuantity();

        int i = low - 1;

        for (int j = low; j <= high; j++){


            if (ranking.get(j).getLoanQuantity() < pivot){
                i++;
                QSSwap(ranking, i, j);
            }
        }

        QSSwap(ranking, i+1, high);
        return i+1;
    }

    public void QuickSort(List<PopularityDto> ranking, int low, int high){
        if (low < high){

            int pivot = QSPartition(ranking, low, high);
            QuickSort(ranking, low, pivot - 1);
            QuickSort(ranking, pivot + 1, high);
        }
    }

    public List<PopularityDto> toolRanking(){
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/", List.class);
        List<Tool> tools = restTemplate.getForObject(toolUrl + "/", List.class);

        List<PopularityDto> Ranking = new ArrayList<>();

        for (Tool tool : tools) {

            PopularityDto popularityDto = new PopularityDto();
            popularityDto.setTool(tool);
            popularityDto.setLoanQuantity(0);

            for (Loan loan : loans) {

                if (loan.getToolId() == tool.getId()) {

                    popularityDto.setLoanQuantity(popularityDto.getLoanQuantity() + 1);
                }

            }

            Ranking.add(popularityDto);
        }

        QuickSort(Ranking, 0, Ranking.size() - 1);

        Collections.reverse(Ranking);

        return Ranking;
    }

    public List<PopularityDto> toolRanking(LocalDate date1, LocalDate date2){
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/" + date1 + "/" + date2, List.class);
        List<Tool> tools = restTemplate.getForObject(toolUrl + "/", List.class);

        List<PopularityDto> Ranking = new ArrayList<>();

        for (Tool tool : tools) {

            PopularityDto popularityDto = new PopularityDto();
            popularityDto.setTool(tool);
            popularityDto.setLoanQuantity(0);

            for (Loan loan : loans) {

                if (loan.getToolId() == tool.getId()) {

                    popularityDto.setLoanQuantity(popularityDto.getLoanQuantity() + 1);
                }

            }

            Ranking.add(popularityDto);
        }

        QuickSort(Ranking, 0, Ranking.size() - 1);

        Collections.reverse(Ranking);

        return Ranking;
    }

    public List<PopularityDto> toolRankingBefore(LocalDate date){
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/Before/" + date, List.class);
        List<Tool> tools = restTemplate.getForObject(toolUrl + "/", List.class);

        List<PopularityDto> Ranking = new ArrayList<>();

        for (Tool tool : tools) {

            PopularityDto popularityDto = new PopularityDto();
            popularityDto.setTool(tool);
            popularityDto.setLoanQuantity(0);

            for (Loan loan : loans) {

                if (loan.getToolId() == tool.getId()) {

                    popularityDto.setLoanQuantity(popularityDto.getLoanQuantity() + 1);
                }

            }

            Ranking.add(popularityDto);
        }

        QuickSort(Ranking, 0, Ranking.size() - 1);

        Collections.reverse(Ranking);

        return Ranking;
    }

    public List<PopularityDto> toolRankingAfter(LocalDate date){
        List<Loan> loans = restTemplate.getForObject(loanUrl + "/After/" + date, List.class);
        List<Tool> tools = restTemplate.getForObject(toolUrl + "/", List.class);

        List<PopularityDto> Ranking = new ArrayList<>();

        for (Tool tool : tools) {

            PopularityDto popularityDto = new PopularityDto();
            popularityDto.setTool(tool);
            popularityDto.setLoanQuantity(0);

            for (Loan loan : loans) {

                if (loan.getToolId() == tool.getId()) {

                    popularityDto.setLoanQuantity(popularityDto.getLoanQuantity() + 1);
                }

            }

            Ranking.add(popularityDto);
        }

        QuickSort(Ranking, 0, Ranking.size() - 1);

        Collections.reverse(Ranking);

        return Ranking;
    }
}
